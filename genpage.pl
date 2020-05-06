#!/usr/bin/env perl

# This script is generating html webpages from the *.content and *.tree files it is given.
# This script is a mess: it is my only Perl program, but I am stuck with it.
# I usually program in Coq and OCaml, but I kept this script, bashing new features as I needed them.
# The resulting script is a monster.
# You can use it as much as you want to, for any purpose.
# But you probably shouldn’t.
# Just use org-mode or any other such framework instead.
# You have been warned.
# — Martin Constantino–Bodin.

use strict;
use strict 'refs';
use warnings;
use HTML::Template;
use URI::Encode qw(uri_encode uri_decode);
# use HTTP::DAV;
use Term::ReadKey;
use POSIX qw(strftime);
use MIME::Base64 qw(encode_base64);
use Encode qw(encode);
# use Data::Printer;

my ($true, $false) = (1, 0);
my $none = "none";

my $linkLang = "link"; # This is a hack for links to be added as this field.

my $generalDatas = "general.data";
my %general = ();

my $workingOnWebSite = $false;
my $changingAdress = $false;

{
	open GENERAL, "<$generalDatas" or die "error while reading file $generalDatas.\n";

	my $languageName = $true;
	my $parsekey = $false;
	my ($language, $key, $value);
	my $currentHash = {};

	while (<GENERAL>){
		if ($_ =~ m/^#/){
			# Comment:  Do nothing.
		} elsif ($languageName){
			$language = $_;
			$language =~ s/\n//g;
			print "loading text for language $language…";
			$languageName = $false;
			$parsekey = $true;
		} elsif ($_ eq "\n"){
			$general{$language} = $currentHash;
			$currentHash = {};
			print "	Done.\n";
			$languageName = $true;
		} elsif ($parsekey){
			$key = $_;
			$key =~ s/^=//; # Removing the heading “=”.
			$key =~ s/\n//g;
			$parsekey = $false;
		} else {
			$value = $_;
			$value =~ s/\n//g;
			$$currentHash{$key} = $value;
			$parsekey = $true;
		}
	}

	close GENERAL;
}

my @languages = keys %general;

my @menusToBeParsed = ();
my %allMenuParsed = ();

my @pagesToBeParsed = ();

my $publish = $false;

foreach my $name (@ARGV){
	if ($name =~ m/\.content/){
		push @pagesToBeParsed, $name;
	} elsif ($name =~ m/\.tree/){
		push @menusToBeParsed, $name;
    } elsif ($name eq "publish"){
        $publish = $true;
	} else {
		die "Don't know what to do with $name…\n";
	}
}

my $password;

if ($publish) {
    print "Type your password: ";
    ReadMode ('noecho'); # don't echo
    chomp ($password = <STDIN>);
    ReadMode (0);        # back to normal
}

my %allParsedPages = ();

my $keywordPage = "page";
my $keywordMenu = "menu";
my $keywordRightImage = "rightImage";
my $keywordSection = "section";
my $keywordSectionName = "sectionName";
my $keywordItem = "item";
my $keywordDescription = "description";
my $keywordSpecDescription = "specdescription";
my $keywordLink = "link";
my $keywordInternalLink = "internalLink";
my $keywordLinkClean = "cleanLink"; # No item arrow.
my $keywordEnd = "end";
my $keywordScripts = "script";
my $keywordAllLanguage = "all";
my $keywordNotUpToDate = "updating";
my $keywordArticle = "article";
my $keywordName = "name";
my $keywordAuthor = "author";
my $keywordConference = "conference";
my $keywordConferenceLong = "conferenceLong";
my $keywordYear = "year";
my $keywordDOI = "doi";
my $keywordNoBib = "noBib";
my $keywordDeclareAuthor = "declareAuthor";
my $keywordFirstName = "firstName";
my $keywordFamilyName = "familyName";
my $keywordDirectLink = "directLink";

my $descrID = "description";
my $PDescrID = "Pdescr";
my $linksID = "links";
my $internalLinkID = "internalLink";
my $rightImageID = "rightImage";
my $menuID = "menu";
my $scriptsID = "scripts";
my $sectionNameID = "sectionName";
my $allID = "all";
my $notUpToDateID = "updating";
my $nameID = "name";
my $directoryID = "directory";
my $pathToRootID = "pathToRoot";
my $sectionsID = "sections";
my $declaredAuthorsID = "declaredAuthors";

my $menuTypeID = "type";
my $menuItemLinkID = "link";
my $menuItemTextID = "text";
my $menuItemSideID = "side";
my $menuNormalID = "normal";
my $menuUnhiddenID = "unhiddenButton";
my $menuHiddenID = "hiddenstate";
my $menuContactID = "contact";
my $menuFlagsID = "flags";
my $menuFlagsDescrID = "flagsDescription";
my $isInternalID = "internal";
my $isArticleID = "isArticle";
my $authorID = "author"; # ID of the author.
my $authorsID = "authors"; # Full declaration of the author.
my $yearID = "year";
my $doiID = "doi";
my $conferenceID = "conference";
my $conferenceLongID = "conferenceLong";
my $doBibID = "dobib";
my $firstNameID = "firstName";
my $familyNameID = "familyName";
my $authoridID = "author_id"; # Field of the author ID.

while (scalar @pagesToBeParsed + scalar @menusToBeParsed != 0){
	foreach my $name (@pagesToBeParsed){
		$name =~ s/\.content//;
		$name = "./".$name;
		$name =~ s/(.*\/)//;
		my $directory = $1;
		$directory =~ s/[^.\/]+\/\.\.\///;
		$directory =~ s/^(\.\/)*//;
		my $pathToRoot = $directory;
		$pathToRoot =~ s/[^\/]+/../g;

		my $content = $directory.$name.".content";

		print "Reading content of file $content…";
		open CONTENT, "<$content" or die "error while reading file $content.\n";

		my @allPages = ();
		my $allSections = [];
		my $declaredAuthors = [];

		my $addLineToString = $false;
		my $addingToTab = $false;
		my $stackIntoObject = $false;
		my $parsingLinkFile = $false;

		my $currentSection;
		my $currentObject;
		my $currentField;
		my $currentLang;

    LINE: while (<CONTENT>){
			$_ =~ s/\n//;
      next LINE if /^#/;
			if ($stackIntoObject){
				if (/^$keywordEnd$/){
					$stackIntoObject = $false;
				} else {
					my $tab = $$currentObject{$currentField};
					my $menuFile = "./".$directory.$_;
					$menuFile =~ s/[^.\/]+\/\.\.\///;
					$menuFile =~ s/^(\.\/)*//;
					push @$tab, $menuFile;
					if (not exists $allMenuParsed{$menuFile}){
						push @menusToBeParsed, $menuFile;
					}
				}
			} elsif ($parsingLinkFile){
				my $file = "./".$directory.$_.".html";
				$file =~ s/[^.\/]+\/\.\.\///;
				$file =~ s/^(\.\/)*//;
				my $fileNameSimpl = $file;
				$fileNameSimpl =~ s/\.html$//;
				if (not exists $allParsedPages{$fileNameSimpl}){
					if (not $directory.$name eq $fileNameSimpl){
						push @pagesToBeParsed, $fileNameSimpl;
					}
				}
				if ($addingToTab){
					my $tab = $$currentObject{$currentField};
					${$$tab[-1]}{$internalLinkID} = $file;
				} else {
					$$currentObject{$internalLinkID} = $file;
				}
				$parsingLinkFile = $false;
			} elsif (/^$keywordPage$/){
				$currentObject = {};
				$$currentObject{$descrID} = [];
				$$currentObject{$notUpToDateID} = $false;
				push @allPages, $currentObject;
				$addLineToString = $false;
				$addingToTab = $false;
			} elsif (/^$keywordDeclareAuthor$/){
				$currentObject = {};
				push @$declaredAuthors, $currentObject;
				$$currentObject{$firstNameID} = "";
				$$currentObject{$familyNameID} = "";
				$$currentObject{$linksID} = [];
				$$currentObject{$authoridID} = "";
				$currentField = $authoridID;
				$currentLang = $none;
				$addLineToString = $true;
				$addingToTab = $false;
			} elsif (/^$keywordFirstName$/){
				$currentField = $firstNameID;
				$addLineToString = $true;
				$addingToTab = $false;
				$currentLang = $none;
			} elsif (/^$keywordFamilyName$/){
				$currentField = $familyNameID;
				$addLineToString = $true;
				$addingToTab = $false;
				$currentLang = $none;
			} elsif (/^$keywordDirectLink$/){
				my $tab = $$currentObject{$linksID};
				push @$tab, { internal => $false, clean => $false };
				$addLineToString = $true;
				$currentField = $linksID;
				$addingToTab = $true;
				$currentLang = $linkLang;
			} elsif (/^$keywordMenu$/){
				$currentField = $menuID;
				$$currentObject{$menuID} = [];
				$stackIntoObject = $true;
			} elsif (/^$keywordNotUpToDate$/){
				$$currentObject{$notUpToDateID} = $true;
			} elsif (/^$keywordRightImage$/){
				$$currentObject{$rightImageID} = "";
				$currentField = $rightImageID;
				$addLineToString = $true;
				$addingToTab = $false;
				$currentLang = $none;
			} elsif (/^$keywordScripts$/){
				$$currentObject{$scriptsID} = {};
				$currentObject = $$currentObject{$scriptsID};
				$addLineToString = $false;
				$addingToTab = $false;
			} elsif (/^$keywordSectionName$/){
				$$currentObject{$sectionNameID} = "";
				$currentField = $sectionNameID;
				$addLineToString = $true;
				$addingToTab = $false;
				$currentLang = $none;
			} elsif (/^$keywordLink$/){
				my $tab = $$currentObject{$linksID};
				push @$tab, { internal => $false, clean => $false };
				$addLineToString = $false;
				$currentField = $linksID;
				$addingToTab = $true;
			} elsif (/^$keywordInternalLink$/){
				my $tab = $$currentObject{$linksID};
				push @$tab, { internal => $true, clean => $false };
				$addLineToString = $false;
				$parsingLinkFile = $true;
				$currentField = $linksID;
				$addingToTab = $true;
			} elsif (/^$keywordLinkClean$/){
				my $tab = $$currentObject{$linksID};
				push @$tab, { internal => $false, clean => $true };
				$addLineToString = $false;
				$currentField = $linksID;
				$addingToTab = $true;
			} elsif (/^$keywordSection$/){
				$currentSection = [];
				$currentObject = {};
				$$currentObject{$descrID} = [];
				push @$currentSection, $currentObject;
				push @$allSections, $currentSection;
				$addLineToString = $false;
				$addingToTab = $false;
			} elsif (/^$keywordItem$/){
				$currentObject = {};
				$$currentObject{$isArticleID} = $false;
				$$currentObject{$descrID} = [];
				$$currentObject{$linksID} = [];
				push @$currentSection, $currentObject;
				$addLineToString = $false;
				$addingToTab = $false;
			} elsif (/^$keywordArticle$/){
				$currentObject = {};
				$$currentObject{$isArticleID} = $true;
				$$currentObject{$authorID} = [];
				$$currentObject{$doiID} = "";
				$$currentObject{$conferenceID} = "";
				$$currentObject{$conferenceLongID} = "";
				$$currentObject{$linksID} = [];
				$$currentObject{$doBibID} = $true;
				push @$currentSection, $currentObject;
				$addLineToString = $false;
				$addingToTab = $false;
			} elsif (/^$keywordAuthor$/){
				my $tab = $$currentObject{$authorID};
				push @$tab, "";
				$addLineToString = $true;
				$currentLang = $none;
				$currentField = $authorID;
				$addingToTab = $true;
			} elsif (/^$keywordConference$/){
				$addLineToString = $true;
				$currentLang = $none;
				$currentField = $conferenceID;
				$addingToTab = $false;
			} elsif (/^$keywordConferenceLong$/){
				$addLineToString = $true;
				$currentLang = $none;
				$currentField = $conferenceLongID;
				$addingToTab = $false;
			} elsif (/^$keywordYear$/){
				$addLineToString = $true;
				$currentLang = $none;
				$currentField = $yearID;
				$addingToTab = $false;
			} elsif (/^$keywordDOI$/){
				$addLineToString = $true;
				$currentLang = $none;
				$currentField = $doiID;
				$addingToTab = $false;
			} elsif (/^$keywordNoBib$/){
				$$currentObject{$doBibID} = $false;
			} elsif (/^$keywordName$/){
				$addLineToString = $true;
				$currentLang = $none;
				$currentField = $nameID;
				$addingToTab = $false;
			} elsif (/^$keywordDescription$/){
				my $tab = $$currentObject{$descrID};
				push @$tab, { $PDescrID => $true };
				$addLineToString = $false;
				$currentField = $descrID;
				$addingToTab = $true;
			} elsif (/^$keywordSpecDescription$/){
				my $tab = $$currentObject{$descrID};
				push @$tab, { $PDescrID => $false };
				$addLineToString = $false;
				$addingToTab = $true;
				$currentField = $descrID;
			} elsif (/^$keywordEnd$/){
				$addLineToString = $false;
			} elsif (/^$keywordAllLanguage$/){
				$addLineToString = $true;
				foreach my $lang (@languages){
					if ($addingToTab){
						my $tab = $$currentObject{$currentField};
						${$$tab[-1]}{$lang} = "";
					} else {
						$$currentObject{$lang} = "";
					}
				}
				$currentLang = $allID;
			} else {
				# Checking if it’s a language.
				if (exists $general{$_}){
					$addLineToString = $true;
					$currentLang = $_;
					if ($addingToTab){
						my $tab = $$currentObject{$currentField};
						${$$tab[-1]}{$_} = "";
					} else {
						$$currentObject{$_} = "";
					}
				} elsif ($addLineToString){
					if ($addingToTab){
						my $tab = $$currentObject{$currentField};
						if ($currentLang eq $allID){
							for my $lang (@languages){
								if (exists ${$$tab[-1]}{$lang}){
									if (${$$tab[-1]}{$lang} ne ""){
										${$$tab[-1]}{$lang} .= "\n";
									}
								}
								${$$tab[-1]}{$lang} .= $_;
							}
						} elsif ($currentLang eq $none){
							$$tab[-1] .= $_;
						} else {
							if (exists ${$$tab[-1]}{$currentLang}){
								if (${$$tab[-1]}{$currentLang} ne ""){
									${$$tab[-1]}{$currentLang} .= "\n";
								}
							}
							${$$tab[-1]}{$currentLang} .= $_;
						}
					} else {
						if ($currentLang eq $allID){
							for my $lang (@languages){
								if (exists $$currentObject{$lang}){
									if ($$currentObject{$lang} ne ""){
									  $$currentObject{$lang} .= "\n";
									}
								}
								$$currentObject{$lang} .= $_;
							}
						} elsif ($currentLang eq $none){
							$$currentObject{$currentField} .= $_;
						} else {
							if (exists $$currentObject{$currentLang}){
								if ($$currentObject{$currentLang} ne ""){
									$$currentObject{$currentLang} .= "\n";
								}
							}
							$$currentObject{$currentLang} .= $_;
						}
					}
				} else {
					if ($_ ne ""){
						print "Warning:  Unknown line meaning “$_”.\n";
					}
				}
			}
		}

		close CONTENT;

		if (not (scalar @allPages == 1)){
			die "More than one page defined!\n";
		}
		$allParsedPages{$directory.$name} = $allPages[0];
		${$allParsedPages{$directory.$name}}{$nameID} = $name;
		${$allParsedPages{$directory.$name}}{$directoryID} = $directory;
		${$allParsedPages{$directory.$name}}{$pathToRootID} = $pathToRoot;
		${$allParsedPages{$directory.$name}}{$sectionsID} = $allSections;
		${$allParsedPages{$directory.$name}}{$declaredAuthorsID} = $declaredAuthors;

		print "	Done.\n";
	}
	@pagesToBeParsed = ();

	foreach my $menuFile (@menusToBeParsed){
		my $name = $menuFile;
		$name = "./".$name;
		$name =~ s/(.*\/)//;
		my $directory = $1;
		$directory =~ s/^(\.\/)*//;

		print "Loading menu ".$name."…";

		my $content = $directory.$name;
		open CONTENT, "<$content" or die "error while reading file $content.\n";

		my $allMenuItems = [];

		my $keywordIgnore = "StartIgnore";
		my $keywordIgnoreEnd = "EndIgnore";
		my $keywordEnd = "end";
		my $keywordMenuItem = "menuItem";
		my $keywordMenuItemContact = "menuItemContact";
		my $keywordMenuFlags = "menuFlags";
		my $keywordHidden = "hiddenItems";
		my $keywordEndHidden = "EndHidden";
		my $keywordSpace = "menuSpace";

		my $nowignoring = $false;
		my $nowhidden = $false;
		my $nowleft = $true;
		my $parsingMenuItemFile = $false;
		my $readingText = $false;

		my $currentSubmenu = $allMenuItems;
		my $currentMenuItem;
		my $currentLanguage;

		while (<CONTENT>){
			$_ =~ s/\n//;
			if ($nowignoring){
				if (/^$keywordIgnoreEnd$/){
					$nowignoring = $false;
				}
			} elsif (/^$keywordIgnore$/){
				$nowignoring = $true;
			} elsif ($parsingMenuItemFile){
				my $file = "./".$directory.$_.".html";
				$file =~ s/[^.\/]+\/\.\.\///;
				$file =~ s/^(\.\/)*//;
				my $fileNameSimpl = $file;
				$fileNameSimpl =~ s/\.html$//;
				if (not exists $allParsedPages{$fileNameSimpl}){
					push @pagesToBeParsed, $fileNameSimpl;
				}
				my $link = {};
				for my $lang (@languages){
					$$link{$lang} = $file;
				}
				$$currentMenuItem{$menuItemLinkID} = $link;
				$$currentMenuItem{$isInternalID} = $true;
				$parsingMenuItemFile = $false;
			} elsif ($readingText){
				if ($currentLanguage eq $allID){
					foreach my $lang (@languages){
						${$$currentMenuItem{$menuItemTextID}}{$lang} = $_;
					}
				} else {
					${$$currentMenuItem{$menuItemTextID}}{$currentLanguage} = $_;
				}
				$readingText = $false;
			} elsif (/^$keywordSpace$/){
				if (not $nowleft){
					die "The identifer “$keywordSpace” is present more than one time in file $menuFile.\n";
				}
				$nowleft = $false;
			} elsif (/^$keywordEndHidden$/){
				if ($nowhidden){
					die "The identifer “$keywordEndHidden” is not used correctly in $menuFile.\n";
				}
				$nowhidden = $false;
			} elsif (/^$keywordEnd$/){
				push @$currentSubmenu, $currentMenuItem;
			} elsif (/^$keywordMenuFlags$/){
			   my $newItem1 = {};
			   $$newItem1{$menuTypeID} = $menuFlagsID;
			   $$newItem1{$menuItemSideID} = $nowleft;
			   push @$currentSubmenu, $newItem1;
			   my $newItem2 = {};
			   $$newItem2{$menuTypeID} = $menuFlagsDescrID;
			   $$newItem2{$menuItemSideID} = $nowleft;
			   push @$currentSubmenu, $newItem2;
			} elsif (/^$keywordMenuItem$/){
				$currentMenuItem = {};
				if ($nowhidden){
					$$currentMenuItem{$menuTypeID} = $menuHiddenID;
				} else {
					$$currentMenuItem{$menuTypeID} = $menuNormalID;
				}
				$$currentMenuItem{$menuItemTextID} = {};
				$$currentMenuItem{$menuItemSideID} = $nowleft;
				$$currentMenuItem{$isInternalID} = $false;
				$parsingMenuItemFile = $true;
			} elsif (/^$keywordHidden$/){
				$currentMenuItem = {};
				$$currentMenuItem{$menuTypeID} = $menuUnhiddenID;
				$$currentMenuItem{$menuItemTextID} = {};
				$$currentMenuItem{$menuItemSideID} = $nowleft;
				$$currentMenuItem{$isInternalID} = $false;
			} elsif (/^$keywordMenuItemContact$/){
				my $contactText = {};
				for my $lang (@languages){
					$$contactText{$lang} = uri_encode (${$general{$lang}}{"contactmeNoJS"});
					$$contactText{$lang} =~ s/\[/%5B/g;
					$$contactText{$lang} =~ s/\]/%5D/g;
				}
				$currentMenuItem = {};
				$$currentMenuItem{$menuTypeID} = $menuContactID;
				$$currentMenuItem{$menuItemTextID} = {};
				$$currentMenuItem{$menuItemLinkID} = $contactText;
				$$currentMenuItem{$menuItemSideID} = $nowleft;
			} elsif (/^$keywordAllLanguage$/){
				$currentLanguage = $allID;
				$readingText = $true;
			} else {
				# Checking if it’s a language.
				if (exists $general{$_}){
					$currentLanguage = $_;
					$readingText = $true;
				} elsif ($_ ne ""){
					print "Warning:  Unknown line meaning “$_” in file $menuFile.\n";
				}
			}
		}

		close CONTENT;

		print "	Done.\n";

		$allMenuParsed{$menuFile} = $allMenuItems;
	}
	@menusToBeParsed = ();
}

while (my ($directoryname, $page) = each %allParsedPages){
	my $name = $$page{$nameID};
	my $directory = $$page{$directoryID};
	my $pathToRoot = $$page{$pathToRootID};
	my $allSections = $$page{$sectionsID};
	my $allAuthors = $$page{$declaredAuthorsID};

	my $htmlfile = $directory.$name.".html";

	print "Preparing to generate file $htmlfile…";

	# The following datas are of types $lang -> @datas.
	my %pageMain = ();

	# Global constants.
	$pageMain{"pathToRoot"} = $pathToRoot;
	$pageMain{"pathFromRoot"} = $directory;

	$pageMain{"isRelocated"} = $changingAdress;
	$pageMain{"isWorking"} = $workingOnWebSite;

	$pageMain{"isNotUpToDate"} = $$page{$notUpToDateID};

	$pageMain{"currentDate"} = strftime "%F", localtime;

	{
		$pageMain{"titlePageAllLanguages"} = "";
		foreach my $lang (@languages){
			if (exists $$page{$lang}){
				if ($pageMain{"titlePageAllLanguages"} ne ""){
					$pageMain{"titlePageAllLanguages"} .= "	—	";
				}

				$pageMain{"titlePageAllLanguages"} .= $$page{$lang};
			}
		}
	}

	if (exists $$page{$rightImageID}){
		$pageMain{"isRightImage"} = $true;
		$pageMain{"rightImage"} = $$page{$rightImageID};
	} else {
		$pageMain{"isRightImage"} = $false;
	}


	my $allLanguages = [];
	$pageMain{"allLanguages"} = $allLanguages;

	my $presentationList = [];
	$pageMain{"presentationList"} = $presentationList;

	my $descriptionPage = [];
	$pageMain{"descriptionPage"} = $descriptionPage;

	if (scalar @$allSections > 1){
		$pageMain{"tocTmpl"} = $true;
	} else {
		$pageMain{"tocTmpl"} = $false;
	}

	{
		foreach my $lang (@languages){
			my $obj = {};
			push @$allLanguages, $obj;

			$$obj{"lang"} = $lang;

			if (exists $$page{$lang}){
				$$obj{"titlePage"} = $$page{$lang};
				$$obj{"titlePageWithBar"} = "	—	".$$page{$lang};
			} else {
				$$obj{"titlePage"} = "";
				$$obj{"titlePageWithBar"} = "";
			}

			my $generalWords = $general{$lang};

			my @allKeys = (
				"langname",
				"textLink",
				"textHide",
				"textShow",
				"textHideAll",
				"textShowAll",
				"textStart",
				"readMore",
				"hideMessage",
				"needJSCSS",
				"JSCSSnotthere",
				"badJS",
				"badJSexplain",
				"noLanguageDetected",
				"created",
				"socials",
				"validHTML5",
				"validCSS3",
				"wrongLang",
				"errorInSocial",
				"spyingSocials",
				"permanentSocials",
				"lastUpdate"
			);
			if ($changingAdress){
				push @allKeys, "relocation";
			}
			if ($workingOnWebSite){
				push @allKeys, "working";
			}
			if ($$page{$notUpToDateID}){
				push @allKeys, "notUpToDate";
			}

			my %keyObject = map { $_ => 42 } @allKeys;
			while (my ($key, $value) = each %$generalWords){
				if (exists $keyObject{$key}){
					$$obj{$key} = $value;
				}
			}
		}
	}

	{
		my $allMenus = [];

		for my $menuName (@{$$page{$menuID}}){
			my $submenu = {};
			my $menu = $allMenuParsed{$menuName};

			my $menuItems = [];

			my @last = ();

			for my $item (@$menu){
				my $tab = [];
				my $objItem = {
					allLanguages => $tab
				};

				if ($$item{$menuItemSideID}){
					push @$menuItems, $objItem;
				} else {
					push @last, $objItem;
				}

				for my $lang (@languages){
					my $otherClasses = "";
					if ($$item{$menuItemSideID}){
						$otherClasses .= " leftMenuItem";
					} else {
						$otherClasses .= " rightMenuItem";
					}
					if ($$item{$menuTypeID} eq $menuUnhiddenID){
						$otherClasses .= " switchMenuItem";
					} elsif ($$item{$menuTypeID} eq $menuHiddenID){
						$otherClasses .= " hiddenMenuItem";
					}
					if (exists $$item{$menuItemLinkID}){
						if (${$$item{$menuItemLinkID}}{$lang} eq $name.".html"){
							$otherClasses .= " menuIsCurrentlyViewed";
						}
					}
					# TODO:  Add depends.

					my $obj;

					if ($$item{$menuTypeID} eq $menuFlagsID){
						$obj = {
								isFlag => $true,
								lang => $lang,
								pathToRoot => $pathToRoot, # Due to problems of scoping in the HTML library, I have to redefine such variable everytime ☹
								langname => ${$general{$lang}}{"langname"},
								otherClasses => $otherClasses
							};
					} elsif ($$item{$menuTypeID} eq $menuFlagsDescrID){
						$obj = {
								isFlag => $false,
								isFlagDescr => $true,
								lang => $lang,
								switchLanguage => ${$general{$lang}}{"switchLanguage"},
								otherClasses => $otherClasses
							};
					} else {
						my $ln = "";
						$ln .= "./".$pathToRoot.${$$item{$menuItemLinkID}}{$lang};
						$ln =~ s/[^.\/]+\/\.\.\///;
						$ln =~ s/^(\.\/)*//;
						$obj = {
								isFlag => $false,
								isFlagDescr => $false,
								lang => $lang,
								menuLink => $ln,
								menuName => ${$$item{$menuItemTextID}}{$lang},
								isContact => $$item{$menuTypeID} eq $menuContactID,
								isInternalLink => $$item{$isInternalID},
								otherClasses => $otherClasses
							};
					}

					push @$tab, $obj;
				}
			}

			@last = reverse @last;

			for my $objItem (@last){
				push @$menuItems, $objItem;
			}

			$$submenu{"allMenuItems"} = $menuItems;

			push @$allMenus, $submenu;
		}

		$pageMain{"allMenus"} = $allMenus;
	}

	{
		for (my $i = 0; $i <= $#{$$page{$descrID}}; $i++){
			my $obj = [];

			push @$presentationList, {
				allLanguages => $obj
			};

			foreach my $lang (@languages){
				push @$obj, {
					lang => $lang,
					content => ${${$$page{$descrID}}[$i]}{$lang},
					isPDescription => ${${$$page{$descrID}}[$i]}{$PDescrID}
				};
			}
		}
	}

	foreach my $section (@$allSections){
		my $descriptionPageTab = [];
		my $projects = [];

		my @sectionTab = @$section;
		my %presentationItem = %{$sectionTab[0]};

		push @$descriptionPage, {
			allLanguages => $descriptionPageTab,
			projects => $projects,
			additionnalScripts => "<!-- TODO:  Adding scripts -->" # TODO!
		};

		# if (exists ${$presentationItem{$scriptsID}}{$lang}){
		# 	$$obj{"additionnalScripts"} = ${$presentationItem{$scriptsID}}{$lang};
		# } else {
		# 	$$obj{"additionnalScripts"} = "";
		# }

		{
			foreach my $lang (@languages){
				my $obj = {};
				push @$descriptionPageTab, $obj;

				$$obj{"lang"} = $lang;

				if (exists $presentationItem{$sectionNameID}){
					$$obj{"hasName"} = $true;
					$$obj{"name"} = $presentationItem{$sectionNameID};
				} else {
					$$obj{"hasName"} = $false;
				}

				$$obj{"titleDescriptionPage"} = $presentationItem{$lang};

				my $tab = [];
				$$obj{"presentationDescriptionPage"} = $tab;

				my @descriptions = @{$presentationItem{$descrID}};
				foreach my $descr (@descriptions){
					push @$tab, {
						lang => $lang,
						content => $$descr{$lang},
						isPDescription => $$descr{$PDescrID}
					};
				}
			}
		}

		for (my $i = 1; $i <= $#sectionTab ; $i++){

			my $tab = [];
			push @$projects, {
				allLanguages => $tab
			};

			my %item = %{$sectionTab[$i]};

			if ($item{$isArticleID}){

				# Fetching the authors
				my $authors = [];
				foreach my $author (@{$item{$authorID}}){
					my $res;
					foreach my $authorInfos (@{$allAuthors}){
						if($$authorInfos{$authoridID} eq $author){
							$res = $authorInfos;
						}
					}
					push @$authors, $res;
				}

				my $description = { $PDescrID => $true };
				$item{$descrID} = [ $description ] ;

				my $name = $item{$conferenceID} . " " . $item{$yearID};

				my $bibtext = "@" . "inproceedings{";
				$bibtext .= $name =~ s/[  ]/_/gr =~ s/<[^>]*>//gr . ",\n";
				$bibtext .= "\ttitle = {" . $item{$nameID} =~ s/<[^>]*>//gr . "},\n";
				if ($item{$conferenceLongID} eq ""){
					$bibtext .= "\tbooktitle = {" . $item{$conferenceID} =~ s/<[^>]*>//gr . "},\n";
				} else {
					$bibtext .= "\tbooktitle = {" . $item{$conferenceLongID} =~ s/<[^>]*>//gr . "},\n";
				}
				if ($item{$doiID} ne ""){
					$bibtext .= "\tdoi = {" . $item{$doiID} =~ s/<[^>]*>//gr . "},\n";
				}
				$bibtext .= "\tauthor = {\n";
				{
					my $currentAuthor = 0;
					foreach my $author (@$authors){
						$bibtext .= "\t\t";
						if ($currentAuthor != 0){
							$bibtext .= "and ";
						} else {
							$bibtext .= "    ";
						}
						$bibtext .= $$author{$familyNameID} . ", ";
						$bibtext .= $$author{$firstNameID} . "\n";
						$currentAuthor++;
					}
				}
				$bibtext .= "\t},\n";
				$bibtext .= "\tyear = {" . $item{$yearID} =~ s/<[^>]*>//gr . "}\n";
				$bibtext .= "}\n";

				my $biburl = "data:application/x-bibtex;charset=utf-8;base64,";
				$biburl .= encode_base64($bibtext, "");

				my $biblink = { internal => $false, clean => $false };
				if ($item{$doBibID}){
					my $tab = $item{$linksID};
					push @$tab, $biblink;
				}

				foreach my $lang (@languages){
					$item{$lang} = $name;

					$$biblink{$lang} = "<a href = \"" . $biburl . "\" ";
					$$biblink{$lang} .= "download = \"" . $name =~ s/[  ]/_/gr =~ s/<[^>]*>//gr . ".bib\">";
					$$biblink{$lang} .= ${$general{$lang}}{"bibtex"} . "</a>";

					$$description{$lang} = "";
					my $currentAuthor = 0;
					foreach my $author (@$authors){
						if (($currentAuthor == $#{$authors}) && ($currentAuthor != 0)){
							if ($#{$authors} != 1){
								$$description{$lang} .= ",";
							}
							$$description{$lang} .= " " . ${$general{$lang}}{"and"} . " ";
						} elsif ($currentAuthor != 0){
							$$description{$lang} .= ", ";
						}
						my $linkContent = "";
						$linkContent .= "<span class = \"name\">" . $$author{$firstNameID};
						$linkContent .= " " . $$author{$familyNameID} . "</span>";
						foreach my $link (@{$$author{$linksID}}){
							my $linkText = "<a ";
							if ($$link{$isInternalID}){
								$linkText .= "class = \"internalLink\" ";
								$linkText .= "href = \"" . $$link{$internalLinkID} . "\"";
							} else {
								$linkText .= "href = \"" . $$link{$linkLang} . "\"";
							}
							$linkText .= " >";
							$linkContent = $linkText . $linkContent . "</a>";
						}
						$$description{$lang} .= $linkContent;
						$currentAuthor++;
					}
					$$description{$lang} .= ", ";
					$$description{$lang} .= "<span class = \"paperName\">" . $item{$nameID} . "</span>";
					$$description{$lang} .= ", ";
					$$description{$lang} .= "<span class = \"journal\">";
					if ($item{$conferenceLongID} ne ""){
						$$description{$lang} .= $item{$conferenceLongID} . " (" . $item{$conferenceID} . ")";
					} else {
						$$description{$lang} .= $item{$conferenceID};
					}
					$$description{$lang} .= "</span>";
					$$description{$lang} .= ", ";
					$$description{$lang} .= $item{$yearID};
					if ($item{$doiID} ne ""){
						$$description{$lang} .= ", ";
						$$description{$lang} .= ${$general{$lang}}{"doi"} . " ";
						$$description{$lang} .= "<a href = \"https://doi.org/$item{$doiID}\">";
						$$description{$lang} .= "$item{$doiID}</a>";
					}
					$$description{$lang} .= ".";
				}
			}

			foreach my $lang (@languages){
				my $descrtab = [];
				for (my $j = 0; $j <= $#{$item{$descrID}}; $j++){
					push @$descrtab, {
						projectsDescription => ${${$item{$descrID}}[$j]}{$lang},
						isPDescription => ${${$item{$descrID}}[$j]}{$PDescrID},
					};
				}

				my $links = [];
				{
					my $linkTab = $item{$linksID};
					for (my $j = 0; $j <= $#$linkTab; $j++){
						if (${$$linkTab[$j]}{"internal"}){
							my $link = ${$$linkTab[$j]}{$internalLinkID};

							push @$links, {
								lang => $lang,
								isInternal => $true,
								link => $link,
								text => ${$$linkTab[$j]}{$lang},
								hasnosharp => $link !~ m/#/
							};
						} elsif (${$$linkTab[$j]}{"clean"}){
							if (${$$linkTab[$j]}{$lang} ne ""){
								push @$links, {
									isInternal => $false,
									isClean => $true,
									projectsLinks => ${$$linkTab[$j]}{$lang}
								};
							}
						} else {
							if (${$$linkTab[$j]}{$lang} ne ""){
								push @$links, {
									isInternal => $false,
									isClean => $false,
									projectsLinks => ${$$linkTab[$j]}{$lang}
								};
							}
						}
					}
				}

				push @$tab, {
					lang => $lang,
					projectsTitle => $item{$lang},
					projectsDescriptions => $descrtab,
					hasLinks => scalar @$links > 0,
					allLinks => $links
				};
			}
		}
	}

	$pageMain{"pageName"} = $name;

	print "	Done.\n";

	print "Generating file $htmlfile…";

	my $page = HTML::Template->new (filename => 'template.tmpl', global_vars => $true);

	$page->param (%pageMain);

	open OUT, ">$htmlfile" or die "error while writing file $htmlfile.\n";
	print OUT $page->output;
	close OUT;

	print "	Done.\n";

    if ($publish){
        print "Sending file $htmlfile…";

        my $d = new HTTP::DAV;
        my $url = "https://webdav.irisa.fr/people.irisa.fr/htdocs/";

        $d->credentials(
                -user => "mbodin",
                -pass => $password, 
                -url => $url,
                -realm => "WebDav"
            );

        $d->open( -url => $url )
            or die ("Couldn’t open $url: " .$d->message . "\n");

        # Upload multiple files to newdir.
        $d->put( -local => $htmlfile, -url => $url )
            or die "Upload failed: " . $d->message . "\n";

	    print "	Done.\n";
    }

}


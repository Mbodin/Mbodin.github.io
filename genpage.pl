#!/usr/bin/env perl

# Working on it…

use strict;
use strict 'refs';
use warnings;
use HTML::Template;
use URI::Encode qw(uri_encode uri_decode);
use HTTP::DAV;
use Term::ReadKey;

my ($true, $false) = (1, 0);

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
my $keywordLinkClean = "cleanLink";
my $keywordEnd = "end";
my $keywordScripts = "script";
my $keywordAllLanguage = "all";
my $keywordNotUpToDate = "updating";

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

		my $addLineToString = $false;
		my $isDescription = $false;
		my $isLink = $false;
		my $stackIntoObject = $false;
		my $parsingLinkFile = $false;

		my $currentSection;
		my $currentObject;
		my $currentField;

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
				my $tab = $$currentObject{$linksID};
				${$$tab[-1]}{$internalLinkID} = $file;
				$parsingLinkFile = $false;
			} elsif (/^$keywordPage$/){
				$currentObject = {};
				$$currentObject{$descrID} = [];
				$$currentObject{$notUpToDateID} = $false;
				push @allPages, $currentObject;
				$addLineToString = $false;
				$isDescription = $false;
				$isLink = $false;
			} elsif (/^$keywordMenu$/){
				$currentField = $menuID;
				$$currentObject{$menuID} = [];
				$stackIntoObject = $true;
			} elsif (/^$keywordNotUpToDate$/){
				$$currentObject{$notUpToDateID} = $true;
			} elsif (/^$keywordRightImage$/){
				$currentField = $rightImageID;
				$$currentObject{$rightImageID} = "";
				$addLineToString = $true;
				$isDescription = $false;
				$isLink = $false;
			} elsif (/^$keywordScripts$/){
				$$currentObject{$scriptsID} = {};
				$currentObject = $$currentObject{$scriptsID};
				$addLineToString = $false;
				$isDescription = $false;
				$isLink = $false;
			} elsif (/^$keywordSectionName$/){
				$$currentObject{$sectionNameID} = "";
				$currentField = $sectionNameID;
				$addLineToString = $true;
				$isDescription = $false;
				$isLink = $false;
			} elsif (/^$keywordLink$/){
				my $tab = $$currentObject{$linksID};
				push @$tab, { internal => $false, clean => $false };
				$addLineToString = $false;
				$isDescription = $false;
				$isLink = $true;
			} elsif (/^$keywordInternalLink$/){
				my $tab = $$currentObject{$linksID};
				push @$tab, { internal => $true, clean => $false };
				$addLineToString = $false;
				$isDescription = $false;
				$parsingLinkFile = $true;
				$isLink = $true;
			} elsif (/^$keywordLinkClean$/){
				my $tab = $$currentObject{$linksID};
				push @$tab, { internal => $false, clean => $true };
				$addLineToString = $false;
				$isDescription = $false;
				$isLink = $true;
			} elsif (/^$keywordSection$/){
				$currentSection = [];
				$currentObject = {};
				$$currentObject{$descrID} = [];
				push @$currentSection, $currentObject;
				push @$allSections, $currentSection;
				$addLineToString = $false;
				$isDescription = $false;
				$isLink = $false;
			} elsif (/^$keywordItem$/){
				$currentObject = {};
				$$currentObject{$descrID} = [];
				$$currentObject{$linksID} = [];
				push @$currentSection, $currentObject;
				$addLineToString = $false;
				$isDescription = $false;
				$isLink = $false;
			} elsif (/^$keywordDescription$/){
				my $tab = $$currentObject{$descrID};
				push @$tab, { $PDescrID => $true };
				$addLineToString = $false;
				$isDescription = $true;
				$isLink = $false;
			} elsif (/^$keywordSpecDescription$/){
				my $tab = $$currentObject{$descrID};
				push @$tab, { $PDescrID => $false };
				$addLineToString = $false;
				$isDescription = $true;
				$isLink = $false;
			} elsif (/^$keywordEnd$/){
				$addLineToString = $false;
			} elsif (/^$keywordAllLanguage$/){
				$addLineToString = $true;
				$currentField = $allID;
				foreach my $lang (@languages){
					if ($isDescription){
						my $tab = $$currentObject{$descrID};
						${$$tab[-1]}{$lang} = "";
					} elsif ($isLink){
						my $tab = $$currentObject{$linksID};
						${$$tab[-1]}{$lang} = "";
					} else {
						$$currentObject{$lang} = "";
					}
				}
			} else {
				# Checking if it’s a language.
				if (exists $general{$_}){
					$addLineToString = $true;
					$currentField = $_;
					if ($isDescription or $isLink){
						my $field = "";
						if ($isDescription){
							$field = $descrID;
						} else {
							$field = $linksID;
						}
						my $tab = $$currentObject{$field};
						${$$tab[-1]}{$_} = "";
					} else {
						$$currentObject{$_} = "";
					}
				} elsif ($addLineToString){
					if ($isDescription or $isLink){
						my $field = "";
						if ($isDescription){
							$field = $descrID;
						} else {
							$field = $linksID;
						}
						my $tab = $$currentObject{$field};
						if ($currentField eq $allID){
							for my $lang (@languages){
                                if (exists ${$$tab[-1]}{$lang}){
                                    if (${$$tab[-1]}{$lang} ne ""){
                                        ${$$tab[-1]}{$lang} .= "\n";
                                    }
                                }
								${$$tab[-1]}{$lang} .= $_;
							}
						} else {
							if (exists ${$$tab[-1]}{$currentField}){
							    if (${$$tab[-1]}{$currentField} ne ""){
							        ${$$tab[-1]}{$currentField} .= "\n";
                                }
                            }
							${$$tab[-1]}{$currentField} .= $_;
						}
					} else {
						if ($currentField eq $allID){
							for my $lang (@languages){
								if (exists $$currentObject{$lang}){
								    if ($$currentObject{$lang} ne ""){
								        $$currentObject{$lang} .= "\n";
                                    }
                                }
								$$currentObject{$lang} .= $_;
							}
						} else {
							if (exists $$currentObject{$currentField}){
                                if ($$currentObject{$currentField} ne ""){
                                    $$currentObject{$currentField} .= "\n";
                                }
                            }
							$$currentObject{$currentField} .= $_;
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

	my $htmlfile = $directory.$name.".html";

	print "Preparing to generate file $htmlfile…";

	# The following datas are of types $lang -> @datas.
	my %pageMain = ();

	# Global constants.
	$pageMain{"pathToRoot"} = $pathToRoot;
	$pageMain{"pathFromRoot"} = $directory;

	$pageMain{"isWorking"} = $workingOnWebSite;

	$pageMain{"isNotUpToDate"} = $$page{$notUpToDateID};

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
				"permanentSocials"
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

			foreach my $lang (@languages){
				my %item = %{$sectionTab[$i]};

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
							push @$links, {
								isInternal => $false,
								isClean => $true,
								projectsLinks => ${$$linkTab[$j]}{$lang}
							};
						} else {
							push @$links, {
								isInternal => $false,
								isClean => $false,
								projectsLinks => ${$$linkTab[$j]}{$lang}
							};
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

